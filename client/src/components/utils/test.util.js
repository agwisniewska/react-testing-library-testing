import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {render} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, '', route)

  return render(ui, { wrapper: BrowserRouter })
}

