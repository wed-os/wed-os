import { stemPath } from '@task/funcs/stemPath'
import { equal } from 'node:assert/strict'
import test from 'node:test'

test('stemPath', () => {
    equal(stemPath(''), '')
    equal(stemPath('/'), '')
    equal(stemPath('/a'), 'a')
    equal(stemPath('/a/b'), 'b')
    equal(stemPath('/a/b.c'), 'b')
    equal(stemPath('/a/b.c.d'), 'b.c')
    equal(stemPath('/a/.b'), '')
    equal(stemPath('/a/.b.c'), '.b')
    equal(stemPath('.'), '')
    equal(stemPath('..'), '.')
    equal(stemPath('...'), '..')
    equal(stemPath('/a/..'), '.')
    equal(stemPath('/a...b'), 'a..')
})
