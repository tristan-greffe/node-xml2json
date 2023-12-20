import { json2xml } from '../lib'

describe('Converts a JSON object to XML', () => {
  test('Basic conversion with text content', () => {
    const expectedXml = '<root><name>John Doe</name><age>30</age></root>'
    const jsonData = {
      root: {
        name: 'John Doe',
        age: 30
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with attributes', () => {
    const expectedXml = '<person id="1" gender="male"><name>John</name></person>'
    const jsonData = {
      person: {
        _attributes: { id: '1', gender: 'male' },
        name: 'John'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with nested elements', () => {
    const expectedXml = '<user><name>John</name><details><age>30</age><city>New York</city></details></user>'
    const jsonData = {
      user: {
        name: 'John',
        details: {
          age: '30',
          city: 'New York'
        }
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with repeated elements', () => {
    const expectedXml = '<items><item>Apple</item><item>Orange</item><item>Banana</item></items>'
    const jsonData = {
      items: {
        item: ['Apple', 'Orange', 'Banana']
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with CDATA section', () => {
    const expectedXml = '<note><![CDATA[This is a CDATA section with <markup>]]></note>'
    const jsonData = {
      note: {
        _cdata: 'This is a CDATA section with <markup>'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with self-closing tags', () => {
    const expectedXml = '<config><option1></option1><option2></option2></config>'
    const jsonData = {
      config: {
        option1: {},
        option2: {}
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with namespaces', () => {
    const expectedXml = '<ns:person xmlns:ns="http://example.com"><ns:name>John</ns:name></ns:person>'
    const jsonData = {
      'ns:person': {
        _attributes: { 'xmlns:ns': 'http://example.com' },
        'ns:name': 'John'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with multiple namespaces', () => {
    const expectedXml = '<ns1:person xmlns:ns1="http://example.com" xmlns:ns2="http://another.com"><ns1:name>John</ns1:name><ns2:age>30</ns2:age></ns1:person>'
    const jsonData = {
      'ns1:person': {
        _attributes: { 'xmlns:ns1': 'http://example.com', 'xmlns:ns2': 'http://another.com' },
        'ns1:name': 'John',
        'ns2:age': '30'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with comments', () => {
    const expectedXml = '<root><!-- This is a comment --><name>John Doe</name></root>'
    const jsonData = {
      root: {
        _comments: ['This is a comment'],
        name: 'John Doe',
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with empty attributes', () => {
    const expectedXml = '<person id="" gender=""><name>John</name></person>'
    const jsonData = {
      person: {
        _attributes: { id: '', gender: '' },
        name: 'John'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with multiple and nested namespaces', () => {
    const expectedXml = '<ns1:person xmlns:ns1="http://example.com" xmlns:ns2="http://another.com"><ns1:name>John</ns1:name><ns2:age>30</ns2:age></ns1:person>'
    const jsonData = {
      'ns1:person': {
        _attributes: { 'xmlns:ns1': 'http://example.com', 'xmlns:ns2': 'http://another.com' },
        'ns1:name': 'John',
        'ns2:age': '30'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with complex attribute values', () => {
    const expectedXml = '<user><name first="John" last="Doe"></name><location city="New York" state="NY"></location><age>30</age></user>'
    const jsonData = {
      user: {
        name: { _attributes: { first: 'John', last: 'Doe' } },
        location: { _attributes: { city: 'New York', state: 'NY' } },
        age: '30'
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with complex XML structure', () => {
    const expectedXml = '<root><person id="1"><name>John</name><details><age>30</age><address><city>New York</city></address></details></person></root>'
    const jsonData = {
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
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with multiple CDATA sections', () => {
    const expectedXml = '<root><note><![CDATA[First paragraph.]]></note><note><![CDATA[Second paragraph.]]></note></root>'
    const jsonData = {
      root: {
        note: [
          { _cdata: 'First paragraph.' },
          { _cdata: 'Second paragraph.' }
        ]
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with special characters in text', () => {
    const expectedXml = '<text>This is a &quot;quoted&quot; text.</text>'
    const jsonData = {
      text: 'This is a "quoted" text.'
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })

  test('Conversion with empty elements', () => {
    const expectedXml = '<root><empty1></empty1><empty2></empty2></root>'
    const jsonData = {
      root: {
        empty1: {},
        empty2: {}
      }
    }
    expect(json2xml(jsonData)).toEqual(expectedXml)
  })
})