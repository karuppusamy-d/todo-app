import z, { ZodError } from "zod";
import { NextResponse } from "next/server";
import { handleZodError } from "@/utils/zod/handleZodError";
import { ApiErrorResponse } from "@/components/types/ApiErrorResponse";
import { todoSchema, todoWithIdSchema } from "@/utils/zod/todoSchema";
import { verify } from "jsonwebtoken";
import { UserJWT } from "@/components/types/user";
import { firestore, sendQuery } from "@/utils/firebase";
import { Todo, TodoWithId } from "@/components/types/todo";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "@/utils/firebase/queries";

const JWT_SECRET = process.env.JWT_SECRET as string;

export type Params = z.infer<typeof todoSchema>;

export async function GET(request: Request) {
  try {
    const user = getCurrentUser(request);
    try {
      const [todos] = await sendQuery(getTodos(user.uid));
      return NextResponse.json(todos, { status: 200 });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = getCurrentUser(request);
    try {
      const todo = todoSchema.parse(await request.json());
      try {
        const id = user.uid.slice(0, 6) + "_" + Date.now();
        const todoWithId: TodoWithId = { ...todo, id, uid: user.uid };

        await addTodo(todoWithId);
        return NextResponse.json(todoWithId, { status: 200 });
      } catch (err: any) {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 400 }
        );
      }
    } catch (err: any) {
      const res: ApiErrorResponse = handleZodError(err as ZodError);
      return NextResponse.json(res, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = getCurrentUser(request);
    try {
      const todo = todoWithIdSchema.parse(await request.json());
      if (todo.uid !== user.uid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      try {
        await updateTodo(todo);
        return NextResponse.json(todo, { status: 200 });
      } catch (err: any) {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 400 }
        );
      }
    } catch (err: any) {
      const res: ApiErrorResponse = handleZodError(err as ZodError);
      return NextResponse.json(res, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = getCurrentUser(request);
    try {
      const id = z.string().parse(request.headers.get("id"));
      try {
        const doc = await getTodo(id);
        if (doc.exists) {
          const todo = doc.data();
          if (todo?.uid === user.uid) {
            await deleteTodo(todo.id);
            return NextResponse.json({ id }, { status: 200 });
          }
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      } catch (err: any) {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 400 }
        );
      }
    } catch (err: any) {
      const res: ApiErrorResponse = handleZodError(err as ZodError);
      return NextResponse.json(res, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
function getCurrentUser(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.split(" ")[1];

  if (!(token.length > 0)) throw new Error("Invalid Token");

  const user = verify(token, JWT_SECRET) as UserJWT;

  if (!user.uid) throw new Error("Unauthorized");
  return user;
}
