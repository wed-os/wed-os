import { normPath } from '@task/funcs/normPath'
import { equal } from 'node:assert/strict'
import { test } from 'node:test'

test('normPath', () => {
    equal(normPath(''), '.')
    equal(normPath('/'), '/')
    equal(normPath('///'), '/')
    equal(normPath('a///b'), 'a/b')
    equal(normPath('/a///b'), '/a/b')
    equal(normPath('/a/./b'), '/a/b')
    equal(normPath('/a/../b'), '/b')
    equal(normPath('/a/../../b'), '/b')
    equal(normPath('/a/../../..'), '/')
    equal(normPath('a/../..'), '.')
    equal(normPath('./a'), 'a')
    equal(normPath('../a'), 'a')
    equal(normPath('.../a'), '.../a')
})
