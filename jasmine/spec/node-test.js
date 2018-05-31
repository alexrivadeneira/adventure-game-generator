describe("generateNewNode", function(){
	it("should generate a new node", function(){
		let newNode = {
			id: 0,
			content: "",
			connections: null,
		};
		expect(generateNewNode()).toEqual(newNode);
	})
});
