import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';

const MockSetTodos = jest.fn();

// Unit tests
describe("AddInput", () => {
    
    test('should render input element', () => {
        render(
            <AddInput 
                setTodos={MockSetTodos} 
                todos={[]} 
            />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type in the input', () => {
        render(
            <AddInput 
                setTodos={MockSetTodos} 
                todos={[]} 
            />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        fireEvent.change(inputElement, { 
            target:{ 
                value: "Buy books" 
            }   
        })
        expect(inputElement.value).toBe("Buy books");
    });
    
    test('should have an empty input when "Add" button is clicked', () => {
        render(
            <AddInput 
                setTodos={MockSetTodos} 
                todos={[]} 
            />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        const buttonElement = screen.getByRole("button", { name: /Add/i })        

        // Events should occur in-sequence
        fireEvent.change(inputElement, { 
            target:{ 
                value: "Buy books" 
            }   
        })
        fireEvent.click(buttonElement)
        expect(inputElement.value).toBe("");
    });

});