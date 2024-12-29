import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Home } from "../components/home";
import { useFetchData } from "@/hooks/usefetchdata";
import { useRouter } from "expo-router";

jest.mock("@/hooks/usefetchdata");
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    useFetchData.mockReturnValue({
      Fiction: [
        { id: "1", bookName: "Book 1", bookCover: "cover1.jpg" },
        { id: "2", bookName: "Book 2", bookCover: "cover2.jpg" },
      ],
      Science: [{ id: "3", bookName: "Book 3", bookCover: "cover3.jpg" }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders categories and books correctly", () => {
    const { getByText, getAllByRole } = render(<Home />);

    expect(getByText("Fiction >")).toBeTruthy();
    expect(getByText("Science >")).toBeTruthy();

    const bookImages = getAllByRole("image");
    expect(bookImages).toHaveLength(3); // 3 books in total
  });

  it("navigates to the category page when a category is clicked", () => {
    const { getByText } = render(<Home />);

    const categoryButton = getByText("Fiction >");
    fireEvent.press(categoryButton);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/category/Fiction",
      params: { categoryName: "Fiction" },
    });
  });

  it("navigates to the book detail page when a book is clicked", () => {
    const { getByLabelText } = render(<Home />);

    const bookButton = getByLabelText("Book 1");
    fireEvent.press(bookButton);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/book-detail/1",
      params: {
        bookName: "Book 1",
        description: "Unknown",
        author: "Unknown",
        rating: "N/A",
        bookCover: "cover1.jpg",
        price: "N/A",
        pdfUrl: "N/A",
      },
    });
  });
});
