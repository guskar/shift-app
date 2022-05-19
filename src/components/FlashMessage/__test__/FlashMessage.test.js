import React from 'react'
import FlashMessage from '../FlashMessage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

it('renders FlashMessage correctly', () => {
  render(<FlashMessage message={'Login failed, check your credentials'} show={true}></FlashMessage>)
  expect(screen.getByTestId('flash')).toBeInTheDocument()
})
