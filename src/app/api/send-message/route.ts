import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    //is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        {
          status: 401,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in adding messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
