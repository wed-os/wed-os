import { upperFirst } from '@task/funcs/upperFirst'
import { equal } from 'assert/strict'
import test from 'node:test'

test('upperFirst', () => {
    equal(upperFirst('text'), 'Text')
    equal(upperFirst(''), '')
})
