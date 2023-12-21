import { xml2json } from '../lib'

describe('Converts an XML string into a JSON object', () => {
  test('Basic conversion with text content', () => {
    const xmlString = '<root><name>John Doe</name><age>30</age></root>'
    const expectedJson = {
      root: {
        name: 'John Doe',
        age: '30'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with attributes', () => {
    const xmlString = '<person id="1" gender="male"><name>John</name></person>'
    const expectedJson = {
      person: {
        _attributes: { id: '1', gender: 'male' },
        name: 'John'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with nested elements', () => {
    const xmlString = '<user><name>John</name><details><age>30</age><city>New York</city></details></user>'
    const expectedJson = {
      user: {
        name: 'John',
        details: {
          age: '30',
          city: 'New York'
        }
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with repeated elements', () => {
    const xmlString = '<items><item>Apple</item><item>Orange</item><item>Banana</item></items>'
    const expectedJson = {
      items: {
        item: ['Apple', 'Orange', 'Banana']
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with CDATA section', () => {
    const xmlString = '<note><![CDATA[This is a CDATA section with <markup>]]></note>'
    const expectedJson = {
      note: {
        _cdata: 'This is a CDATA section with <markup>'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with self-closing tags', () => {
    const xmlString = '<config><option1/><option2/></config>'
    const expectedJson = {
      config: {
        option1: {},
        option2: {}
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with namespaces', () => {
    const xmlString = '<ns:person xmlns:ns="http://example.com"><ns:name>John</ns:name></ns:person>'
    const expectedJson = {
      'ns:person': {
        _attributes: { 'xmlns:ns': 'http://example.com' },
        'ns:name': 'John'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with multiple namespaces', () => {
    const xmlString = '<ns1:person xmlns:ns1="http://example.com" xmlns:ns2="http://another.com"><ns1:name>John</ns1:name><ns2:age>30</ns2:age></ns1:person>'
    const expectedJson = {
      'ns1:person': {
        _attributes: { 'xmlns:ns1': 'http://example.com', 'xmlns:ns2': 'http://another.com' },
        'ns1:name': 'John',
        'ns2:age': '30'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with XML comments', () => {
    const xmlString = '<root><!-- This is a comment --><name>John Doe</name></root>'
    const expectedJson = {
      root: {
        _comments: ['This is a comment'],
        name: 'John Doe',
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with special XML entities', () => {
    const xmlString = '<data>&lt;example&gt; &amp; &lt;/example&gt;</data>'
    const expectedJson = {
      data: '<example> & </example>'
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with empty attributes', () => {
    const xmlString = '<person id="" gender=""><name>John</name></person>'
    const expectedJson = {
      person: {
        _attributes: { id: '', gender: '' },
        name: 'John'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with multiple and nested namespaces', () => {
    const xmlString = '<ns1:person xmlns:ns1="http://example.com" xmlns:ns2="http://another.com"><ns1:name>John</ns1:name><ns2:age>30</ns2:age></ns1:person>'
    const expectedJson = {
      'ns1:person': {
        _attributes: { 'xmlns:ns1': 'http://example.com', 'xmlns:ns2': 'http://another.com' },
        'ns1:name': 'John',
        'ns2:age': '30'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with complex attribute values', () => {
    const xmlString = '<user><name first="John" last="Doe"/><location city="New York" state="NY"/><age>30</age></user>'
    const expectedJson = {
      user: {
        name: { _attributes: { first: 'John', last: 'Doe' } },
        location: { _attributes: { city: 'New York', state: 'NY' } },
        age: '30'
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with special XML elements like processing instructions', () => {
    const xmlString = '<?xml version="1.0" encoding="UTF-8"?><data>Hello World!</data>'
    const expectedJson = {
      data: 'Hello World!'
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with complex XML structure', () => {
    const xmlString = '<root><person id="1"><name>John</name><details><age>30</age><address><city>New York</city></address></details></person></root>'
    const expectedJson = {
      root: {
        person: {
          _attributes: { id: '1' },
          name: 'John',
          details: {
            age: '30',
            address: {
              city: 'New York'
            }
          }
        }
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with multiple CDATA sections', () => {
    const xmlString = '<root><note><![CDATA[First paragraph.]]></note><note><![CDATA[Second paragraph.]]></note></root>'
    const expectedJson = {
      root: {
        note: [
          { _cdata: 'First paragraph.' },
          { _cdata: 'Second paragraph.' }
        ]
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with special characters in text', () => {
    const xmlString = '<text>This is a &quot;quoted&quot; text.</text>'
    const expectedJson = {
      text: 'This is a "quoted" text.'
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with empty elements', () => {
    const xmlString = '<root><empty1/><empty2></empty2></root>'
    const expectedJson = {
      root: {
        empty1: {},
        empty2: {}
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })

  test('Conversion with malformed XML structure', () => {
    const xmlString = '<root><person><name>John Doe</name></root>'
    const expectedJson = {
      root: {
        name: 'John Doe',
        person: {}
      }
    }
    expect(xml2json(xmlString)).toEqual(expectedJson)
  })
})

