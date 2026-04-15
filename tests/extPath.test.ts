import { extPath } from '@task/funcs/extPath'
import { equal } from 'node:assert/strict'
import test from 'node:test'

test('extPath', () => {
    equal(extPath(''), '')
    equal(extPath('/'), '')
    equal(extPath('/a'), '')
    equal(extPath('/a/b'), '')
    equal(extPath('/a/b.c'), 'c')
    equal(extPath('/a/b.c.d'), 'd')
    equal(extPath('/a/.b'), 'b')
    equal(extPath('/a/.b.c'), 'c')
    equal(extPath('.'), '')
    equal(extPath('..'), '')
    equal(extPath('...'), '')
    equal(extPath('....'), '')
    equal(extPath('/a/..'), '')
    equal(extPath('/a...b'), 'b')
})
