import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  id: number;
  name: string;
};

type GetResponseData = {
  users: User[];
};

type PostResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData>
) {
  if (req.method === "GET") {
    const users: User[] = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    res.status(200).json({ users });
  } else if (req.method === "POST") {
    const { name } = req.body as { name: string };
    res.status(201).json({ message: `User ${name} created successfully` });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
