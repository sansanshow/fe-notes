import observe from './observer'

var library = {
  book1: {
      name: ''
  },
  book2: ''
}

observe(library);

library.book1.name = 'css权威指南'