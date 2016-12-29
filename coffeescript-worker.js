const CoffeeScript = require('coffee-script')

onmessage = function (event) {
  const {code: value, id, filename, options} = event.data
  let output

  try {
    const code = CoffeeScript.compile(value, {
      bare: true,
      ...options,
    })

    output = {
      filename,
      id,
      type: 'code',
      code,
    }
  } catch (e) {
    output = {
      filename,
      id,
      type: 'error',
      error: {
        message: e.message.replace('unknown', e.name),
      },
    }
  }

  postMessage(JSON.stringify(output))
}
