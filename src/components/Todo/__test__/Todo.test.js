import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
        </BrowserRouter>
    );
}

const addTodoItems = (items) => {
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    items.forEach(item => {
        fireEvent.change(inputElement, { 
            target:{ 
                value: item
            }   
        })        

        fireEvent.click(buttonElement)
    });
}

// Unit tests
describe("Todo", () => {
    
    test('should render input element', () => {
        render(<MockTodo />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        const buttonElement = screen.getByRole("button", { name: /Add/i });       

        // SEQUENCE MATTERS THE MOST
        fireEvent.change(inputElement, { 
            target:{ 
                value: "Buy books" 
            }   
        })        

        fireEvent.click(buttonElement)

        const divElement = screen.getByText(/Buy books/i);
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render multiple todo items in list', () => {
        render(<MockTodo />);
        addTodoItems(["Buy books", "Wash hands", "Get things done!"]);

        const divElements = screen.getAllByTestId("items-list");
        expect(divElements.length).toBe(3);
    });

    test('should render todo items in list without "strike-through" i.e should not have "completed" class applied', () => {
        render(<MockTodo />);
        addTodoItems(["Buy books"]);

        const divElement = screen.getByText(/Buy books/i);
        expect(divElement).not.toHaveClass("todo-item-active");
    });

    test('should render todo items in list with "strike-through" i.e should have "completed" class applied when clicked', () => {
        render(<MockTodo />);
        addTodoItems(["Buy books"]);

        const divElement = screen.getByText(/Buy books/i);
        fireEvent.click(divElement);
        expect(divElement).toHaveClass("todo-item-active");
    });

});