export const { css } = window['emotion']
export const { createElement, useState, useMemo, useEffect, useReducer } = window['React']
export const ReactDOM = window['ReactDOM']

const htm = window['htm']
export const html = htm.bind(createElement)
