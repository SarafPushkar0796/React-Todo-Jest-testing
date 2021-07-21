import { render, screen } from '@testing-library/react';
import TodoFooter from '../TodoFooter';

import { BrowserRouter } from 'react-router-dom';

/**
 * Mock component where in we wrap the Todo because it has a router 'Link' component as child inside it
 * And since the tests are performed in a cmplete isolation, they may fail when trying to test without 
 * using the BrowserRouter
 */
const MockTodoFooter = ({numberOfIncompleteTasks}) => {
    return(
        <BrowserRouter>
            <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks}/>
        </BrowserRouter>
    )    
}

// Unit tests
describe("TodoFooter", () => {
    
    test('should render the correct amount of incomplete tasks', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={5} />);
        const paragraphElement = screen.getByText(/5 tasks left/i);
        expect(paragraphElement).toBeInTheDocument();
    });
    
    test('should render "task" when number of tasks is one(1)', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);
        expect(paragraphElement).toBeInTheDocument();
    });
    
    test('should be visible to the user', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);
        expect(paragraphElement).toBeVisible();
    });
    
    test('should have a value(text content) of "2 tasks left"', () => {
        render(<MockTodoFooter numberOfIncompleteTasks={2} />);
        const paragraphElement = screen.getByText(/2 tasks left/i);
        expect(paragraphElement.textContent).toBe("2 tasks left");
    });

});