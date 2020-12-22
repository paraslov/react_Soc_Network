import {create} from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('Profile status component',  () => {
    test('Profile status from props should be in the state', () => {
        const component = create(<ProfileStatus status = 'para-slov.ru'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('para-slov.ru');
    })
    test('after creation span should be mounted', () => {
        const component = create(<ProfileStatus status = 'para-slov.ru'/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    })
    test('after creation span should have status text', () => {
        const component = create(<ProfileStatus status = 'para-slov.ru'/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('para-slov.ru');
    })

    test("after creation input shouldn't be mounted", () => {
        const component = create(<ProfileStatus status = 'para-slov.ru'/>);
        const root = component.root;        
        expect( () => {
            const input = root.findByType('input');
        }).toThrow();
    })
    test('on DoubleClick input should be displayed instead of span', () => {
        const component = create(<ProfileStatus status = 'para-slov.ru'/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('para-slov.ru');
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status = 'para-slov.ru' updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactiveteEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
    
})