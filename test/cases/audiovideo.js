const t = require('tap')
const tumble = require('../..')
const { test, ast, astNoChange, node } = require('./common.js')

t.test('basic video embed', async t => {
  const tags = ['object', 'iframe', 'embed', 'video']
  const widths = [ null, 420 ]
  for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j < widths.length; j++) {
      await test(
        node({ video: `<${tags[i]} width=350></${tags[i]}>` }, '123'),
        ast(t, `tag=${tags[i]} w=${widths[j]}`),
        widths[j]
      )
    }
  }
})

t.test('youtube url embeds', t => {
  const urls = [
    'https://www.youtube.com/watch?v=oIIxlgcuQRU',
    'https://youtu.be/oIIxlgcuQRU',
    'https://youtu.be/oIIxlgcuQRU?t=36',
    'https://www.youtube.com/watch?v=oIIxlgcuQRU&t=36',
    'https://not.youtube.url.com/',
  ]
  t.plan(urls.length)
  urls.forEach(u => {
    t.test(u, t => test(
      node({ youtube: u }, '123'),
      ast(t, `youtube ${u}`),
      420))
  })
})

t.test('vimeo url embeds', t => {
  const urls = [
    'https://vimeo.com/232554578',
    'https://example.com',
    'https://vimeo.com/52900095',
  ]
  t.plan(urls.length)
  urls.forEach(u => {
    t.test(u, t => test(
      node({ vimeo: u }, '123'),
      ast(t, `vimeo ${u}`),
      420))
  })
})

t.test('basic audio embed', async t => {
  const tags = ['object', 'iframe', 'embed', 'video', 'audio']
  const widths = [ null, 666 ]
  for (let i = 0; i < tags.length; i++) {
    for (let j = 0; j < widths.length; j++) {
      await test(
        node({
          audio: `<${tags[i]} style="width:350px" width=350></${tags[i]}>`
        }, '6969'),
        ast(t, `tag=${tags[i]} w=${widths[j]}`))
    }
  }
})

t.test('scale video height', async t => {
  const heights = [100, 900]
  const widths = [100, 900]
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < widths.length; j++) {
      await test(
        node({video: `<object
              height=${heights[i]} width=${widths[j]}><embed
              height=${heights[i]} width=${widths[j]}></embed>
              </object>`},'x'),
        ast(t, `width=${widths[j]} height=${heights[i]}`),
        750)
    }
  }
})
