// import NextAuth, { Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcrypt from "bcryptjs";
// import { JWT } from "next-auth/jwt";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any): Promise<any> {
//         await dbConnect();

//         try {
//           const user = await UserModel.findOne({
//             email: credentials.email,
//           });
//           if (!user) {
//             throw new Error("No user found with this email");
//           }
//           if (!user.isVerified) {
//             throw new Error("Please verify your account before logging in");
//           }
//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (isPasswordCorrect) {
//             return user;
//           } else {
//             throw new Error("Incorrect password");
//           }
//         } catch (err: any) {
//           console.log("Error in auth bhai \n", err)
//           throw new Error(err);
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/sign-in",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.AUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id?.toString(); // Convert ObjectId to string
//         token.isVerified = user.isVerified;
//         token.isAcceptingMessage = user.isAcceptingMessage;
//         token.username = user.username;
//       }
//       return token;
//     },
//     // : { session: Session; token: JWT }
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.isVerified = token.isVerified;
//         session.user.isAcceptingMessage = token.isAcceptingMessage;
//         session.user.username = token.username;
//       }
//       return session;
//     },
//   },
// });
