// import autoBind from "auto-bind";




export default function autoBind(obj) {
	let proto = Object.getPrototypeOf(obj);
	for (let k of Object.getOwnPropertyNames(proto)) {
	    if (typeof proto[k] === 'function' && k !== 'constructor')
	        obj[k] = proto[k].bind(obj)
	}
}