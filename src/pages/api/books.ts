import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await createBook(req, res);
  } else if (req.method === "GET") {
    return await readBooks(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
};

const createBook = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        bookTitle: body.title as string,
        bookAuthor: body.author as string,
        bookGenre: body.genre as string,
      },
    });
    return res.status(200).json(newBook);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating book", success: false });
  }
};

const readBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error reading books", success: false });
  }
};

export default examples;
