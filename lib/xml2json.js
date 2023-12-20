import _ from 'lodash'

export function xml2json (xmlString) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml')

  // Recursive function to convert an XML node to a JSON object
  const parseNode = (node) => {
    const obj = {}

    // Process attributes
    if (node.attributes.length > 0) obj['_attributes'] = _.mapValues(_.keyBy(node.attributes, 'nodeName'), 'nodeValue')
    
    // Process comments
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i]
      if (child.nodeType === 8) {
        if (!('_comments' in obj)) obj['_comments'] = []
        obj['_comments'].push(child.nodeValue.trim())
      }
    }

    // Process children
    if (node.childNodes.length === 1 && (node.childNodes[0].nodeType === 3 || node.childNodes[0].nodeType === 4)) {
      if (node.childNodes[0].nodeType === 3) return node.childNodes[0].nodeValue.trim()
      if (node.childNodes[0].nodeType === 4) return { '_cdata': node.childNodes[0].nodeValue.trim() }
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i]
      if (child.nodeType === 1) {
        const childObj = parseNode(child)
        const nodeName = child.nodeName
        // If the parent object already has this key, convert it to an array if it's not already
        if (nodeName in obj) obj[nodeName] = _.concat(obj[nodeName], childObj)
        else obj[nodeName] = childObj
      }
    }

    return obj
  }

  // Initial call
  const result = parseNode(xmlDoc.firstChild)

  return { [xmlDoc.firstChild.nodeName]: result }
}
