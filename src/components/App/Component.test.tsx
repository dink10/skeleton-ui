import * as React from 'react'
import { create, ReactTestRenderer } from 'react-test-renderer'
import App from './Component'

test('app snapshot', () => {
    const component: ReactTestRenderer = create(<App />)
    expect(component).toMatchSnapshot()
    component.unmount()
})
