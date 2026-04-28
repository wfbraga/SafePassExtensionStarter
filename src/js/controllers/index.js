import { application } from '../application'

import AppController from "./app_controller.js"
application.register('app', AppController)

import AuthController from "./auth_controller.js"
application.register('auth', AuthController)

import EntriesController from "./entries_controller.js"
application.register('entries', EntriesController)

import SearchController from "./search_controller.js"
application.register('search', SearchController)

import ClipboardController from "./clipboard_controller.js"
application.register('clipboard', ClipboardController)

import TogglePasswordController from "./toggle_password_controller.js"
application.register('toggle-password', TogglePasswordController)