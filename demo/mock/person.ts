const person = {
  getPersonFromApi() {
    // call API
    return {
      id: 1,
      name: 'Taylor',
      address: '111/11',
    };
  },

  getName() {
    return this.getPersonFromApi().name;
  },

  getAddress() {
    return this.getPersonFromApi().address;
  },
};

export default person;
