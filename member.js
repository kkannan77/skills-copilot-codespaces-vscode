function skillsMember() {
    return {
        name: "John Doe",
        skills: ["JavaScript", "HTML", "CSS"],
        age: 25,
        getSkills() {
            return this.skills;
        }
    };
}