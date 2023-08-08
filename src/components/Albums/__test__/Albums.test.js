import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Albums } from "../Albums";
import { getAlbums } from "../../../apiCalls";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../../apiCalls", () => ({
  getAlbums: jest.fn(),
}));

jest.mock("../../Loader/Loader", () => ({
  Loader: () => {
    return <div>Loading</div>
  }
}));

jest.mock("../../Error/Error", () => ({
  Error: () => {
    return <div>Error</div>
  }
}));

// jest.mock("../../AlbumCard/AlbumCard", () => ({
//   AlbumCard: () => {
//     return <div>Album Card</div>
//   }
// }));

const MockAlbums = () => {
  return (
    <BrowserRouter>
      <Albums />
    </BrowserRouter>
  )
}

describe("Albums componenet", () => {
  const mockAlbumsData = [
    { id: 1, title: "Test Album One" },
    { id: 2, title: "Test Album Two" }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it ("should show loader when loading", async () => {
    getAlbums.mockResolvedValueOnce([]);
    render(MockAlbums());

    await act(async () => {
        await waitFor(() => expect(screen.getByText("Loading")).toBeInTheDocument());
    });
  })

  it("should fetch and display albums", async () => {
    getAlbums.mockResolvedValueOnce(mockAlbumsData);
    render(<MockAlbums />);
  
    await waitFor(() => {
      expect(screen.getByText("Test Album One")).toBeInTheDocument();
      expect(screen.getByText("Test Album Two")).toBeInTheDocument();
    });
    expect(getAlbums).toHaveBeenCalledTimes(1);
  });

  it("should search albums by title", async () => {
    getAlbums.mockResolvedValueOnce(mockAlbumsData);
    render(<MockAlbums />);

    await screen.findByText("Test Album One");
 
    fireEvent.change(screen.getByPlaceholderText(/search by album title or id/i), {
      target: { value: "Test Album One" }
    });
 
    expect(screen.getByText("Test Album One")).toBeInTheDocument();
    expect(screen.queryByText("Test Album Two")).toBeNull();
  });

  it("should search albums by id", async () => {
    getAlbums.mockResolvedValueOnce(mockAlbumsData);
    render(<MockAlbums />);

    await screen.findByText("Test Album One");
 
    fireEvent.change(screen.getByPlaceholderText(/search by album title or id/i), {
      target: { value: "1" }
    });
 
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeNull();
  });

  it("should display Error component on fetch failure", async () => {
    getAlbums.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<MockAlbums />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

})
