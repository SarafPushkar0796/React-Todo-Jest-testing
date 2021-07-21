import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
}

// Unit tests
/**
 * The test here is written to test if we get data back from the API
 * but in cases of data not received back from API, due to some reason, the test may fail
 * In that case we should include a MOCK REQUEST that returns a dummy data exactly with the same structure as of the original data
 */
describe("FollowersList", () => {    

    test('should render followers list items', async () => {
        render(<MockFollowersList />);
        const followerDivElements = await screen.findAllByTestId(/follower-item-/i);        
        expect(followerDivElements.length).toBe(5);
    });

});