class subject {
  constructor() {
    this.observers = []
  }

  addObserver () {
    this.observers.push(observer);
  }

  removeObserver () {
    const removeIndex = this.observers.findIndex(obs => {
      return observer === obs;
    });

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  notify (data) {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.update(data));
    }
  }
}


class observer {
  update () {

  }
}

class State extends Subject {
  constructor() {
    super();
    this.state = {};
  }

  // Update the state.
  // Calls the update method on each observer.
  update (data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  // Get the state.
  get () {
    return this.state;
  }
}

class List extends Observer {
  createMarkup (state) {
    return `<ul>
    ${state.users.map(user => `<li>${user.name}</li>`).join("\n")}
    </ul>`;
  }

  render (state, selector = "app") {
    const markup = this.createMarkup(state);
    const parent = document.getElementById(selector);

    parent.innerHTML = markup;
  }

  // This method will be called by the Subject(state) whenever it updates.
  // Notice how it prompts a re-render.
  update (state) {
    this.render(state, "user-list-container");
  }
}

// 应用示例 https://codesandbox.io/s/vqq4vvxl20?view=preview