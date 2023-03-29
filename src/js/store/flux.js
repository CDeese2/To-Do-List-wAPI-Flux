const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
		// Need to add list in order to have a place to store items once created/addedf
			list: [
				
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

//CD added this (const list)
				const list = store.list.map((elm, i) =>{
					if (i === index) elm = todo;
					console.log("Elm",elm)
					return elm;
				})

				//reset the global store
				setStore({ demo: demo });
			},

//CD added this (todoList and deleteTask)

	//Renders To Do List from the store
			todoList: (todo) => {
				const store = getStore();
				setStore({ list: [...store.list, todo]})
				return store.list
			},

	//Deletes Task from List using Button - Actually makes a new array removing the task based on the id
			deleteTask: (id) => {
				console.log("Delete Task Clicked")
				const store = getStore();
				setStore({ list: store.list.filter((item, index)=>{
					return index != id
				})
			})
				return store.list
			}

		}
	};
};

export default getState;
