import { application } from '../application'

import AppController from "./app_controller.js"
application.register('app', AppController)

import AuthController from "./auth_controller.js"
application.register('auth', AuthController)

import EntriesController from "./entries_controller.js"
application.register('entries', EntriesController)