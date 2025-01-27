// @ts-check
/* eslint-env es2022 */
/* eslint-disable-next-line no-undef */

export default {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
        'subject-case': [2, 'always', 'sentence-case']
    }
}