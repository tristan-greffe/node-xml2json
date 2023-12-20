import _ from 'lodash'

export function json2xml (obj) {
  function convertNode(nodeName, nodeValue) {
    let innerXml = ''

    if (_.isArray(nodeValue)) return nodeValue.map((item) => convertNode(nodeName, item)).join('')
    if (!_.isObject(nodeValue)) return `<${nodeName}>${escapeXml(nodeValue)}</${nodeName}>`
    
    // Process content excluding attributes, CDATA, and comments
    if (_.has(nodeValue, '_attributes') || _.has(nodeValue, '_cdata') || _.has(nodeValue, '_comments')) {
      const content = _.omit(nodeValue, '_attributes', '_cdata', '_comments')
      innerXml = _.map(content, (value, key) => convertNode(key, value)).join('')
    }
    
    if (_.has(nodeValue, '_attributes')) {
      // Process attributes
      const attributes = _.map(nodeValue._attributes, (value, key) => {
        if (key.startsWith('xmlns:')) return `xmlns:${key.split(':')[1]}="${value}"`
        else return `${key}="${value}"`
      }).join(' ')
      // Return the node with attributes and inner content
      if (_.has(nodeValue, '_cdata')) return `<${nodeName} ${attributes}><![CDATA[${nodeValue._cdata}]]></${nodeName}>`
      
      return `<${nodeName} ${attributes}>${innerXml}</${nodeName}>`
    }

    if (_.has(nodeValue, '_cdata')) return `<${nodeName}><![CDATA[${nodeValue._cdata}]]></${nodeName}>`
    
    if (_.has(nodeValue, '_comments')) {
      const comments = _.isArray(nodeValue._comments) ? nodeValue._comments.join(' ') : nodeValue._comments
      return `<${nodeName}><!-- ${comments} -->${innerXml}</${nodeName}>`;
    }

    // Handle other objects
    return `<${nodeName}>${_.map(nodeValue, (value, key) => convertNode(key, value)).join('')}</${nodeName}>`
  }

  const rootKey = _.keys(obj)[0]
  const rootNode = obj[rootKey]

  return convertNode(rootKey, rootNode)
}

function escapeXml (text) {
  if (typeof text === 'string') {
    return text.replace(/[<>&"']/g, (match) => {
      const replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
      }
      return replacements[match]
    })
  }
  return text // Return unchanged if not a string
}