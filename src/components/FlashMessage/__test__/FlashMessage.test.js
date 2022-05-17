import React from 'react'
import ReactDOM from 'react-dom'
import FlashMessage from '../FlashMessage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FlashMessage></FlashMessage>, div)
})
it('renders FlashMessage correctly', () => {
  render(<FlashMessage message={'Login failed, check your credentials'} show={true}></FlashMessage>)
  expect(screen.getByTestId('flash')).toBeInTheDocument()
})
