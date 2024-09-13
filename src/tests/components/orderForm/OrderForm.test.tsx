import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { OrderForm } from "../../../components";
import { mockBCList, mockInitialData } from "../../mocks";
import { faker } from "@faker-js/faker";

vi.mock("../../../hooks/useGetBlockchains", () => ({
  useGetBlockchains: () => ({ blockchains: mockBCList }),
}));
vi.mock("../../../hooks/useCryptoPrice", () => ({
  useCryptoPrice: () => ({ price: 100 }),
}));

describe("OrderForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Renders form with correct UI when creating an order", () => {
    render(<OrderForm />);
    const title = screen.getByText("Create OTC Order");
    expect(title).toBeInTheDocument();
  });

  it("Renders form with correct UI when editing an order", () => {
    render(<OrderForm initialData={mockInitialData} />);
    const title = screen.getByText("Edit OTC Order");
    expect(title).toBeInTheDocument();
  });

  it("Should display a hints to users if they do not enter a value in the Quantity and ExpireDate input fields.", async () => {
    const user = userEvent.setup();
    render(<OrderForm />);
    const submitButton = screen.getByRole("button", { name: "Create Order" });
    await user.click(submitButton);

    const qtyInputHint = screen.getByTestId("qty-input-hint-error");
    const dateInputHint = screen.getByTestId("date-input-hint-error");

    expect(qtyInputHint).toBeInTheDocument();
    expect(dateInputHint).toBeInTheDocument();
  });

  it("Should display a custom error message if the user enters a negative quantity and try to submit", async () => {
    const user = userEvent.setup();
    render(<OrderForm />);

    const qtyInputDiv = screen.getByTestId("quantity");
    const qtyInput = qtyInputDiv.firstChild as Element;

    await user.type(qtyInput, (-faker.number.float()).toString());

    const submitButton = screen.getByRole("button", { name: "Create Order" });
    await user.click(submitButton);
    const qtyInputHint = screen.getByTestId("qty-input-hint-error");

    expect(qtyInputHint).toHaveTextContent("Quantity must be positive");
  });

  it("Should display a custom error message if the user enters a value that is not a number and try to submit", async () => {
    const user = userEvent.setup();
    render(<OrderForm />);

    const qtyInputDiv = screen.getByTestId("quantity");
    const qtyInput = qtyInputDiv.firstChild as Element;

    await user.type(qtyInput, faker.lorem.word());

    const submitButton = screen.getByRole("button", { name: "Create Order" });
    await user.click(submitButton);
    const qtyInputHint = screen.getByTestId("qty-input-hint-error");

    expect(qtyInputHint).toHaveTextContent("Quantity must be positive");
  });
});
