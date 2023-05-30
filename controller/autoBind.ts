// import autoBind from "auto-bind";

export default function autoBind(obj) {
	let proto = Object.getPrototypeOf(obj);
	// console.log('proto =>>>>>',proto);
	for (let k of Object.getOwnPropertyNames(proto)) {
		if (typeof proto[k] === "function" && k !== "constructor")
			obj[k] = proto[k].bind(obj);
			// console.log('proto22 =>>>>>',k);

	}

}
