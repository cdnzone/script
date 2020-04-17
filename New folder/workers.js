'use strict';
const b2Domain = 'dl.oiin.ga';
const b2Bucket = 'datapps';
// f000.backblazeb2.com
const b2UrlPath = `/file/${b2Bucket}/`;
addEventListener('fetch', event => {
	return event.respondWith(fileReq(event));
});
const corsFileTypes = ['png', 'jpg', 'gif', 'jpeg', 'webp', 'js', 'css', 'txt', 'apk', 'zip', 'obb'];
const removeHeaders = [
	'x-bz-content-sha1',
	'x-bz-file-id',
	'x-bz-file-name',
	'x-bz-info-src_last_modified_millis',
	'X-Bz-Upload-Timestamp',
	'Expires'
];
const expiration = 31536000;
const fixHeaders = function(url, status, headers){
	let newHdrs = new Headers(headers);
	if(corsFileTypes.includes(url.pathname.split('.').pop())){
		newHdrs.set('Access-Control-Allow-Origin', '*');
	}
	if(status === 200){
		newHdrs.set('Cache-Control', "public, max-age=" + expiration);
	}else{
		newHdrs.set('Cache-Control', 'public, max-age=300');
	}
	const ETag = newHdrs.get('x-bz-content-sha1') || newHdrs.get('x-bz-info-src_last_modified_millis') || newHdrs.get('x-bz-file-id');
	if(ETag){
		newHdrs.set('ETag', ETag);
	}
	removeHeaders.forEach(header => {
		newHdrs.delete(header);
	});
	return newHdrs;
};
async function fileReq(event){
	const cache = caches.default; // Cloudflare edge caching
	const url = new URL(event.request.url);
	if(url.host === b2Domain && !url.pathname.startsWith(b2UrlPath)){
		url.pathname = b2UrlPath + url.pathname;
	}
	let response = await cache.match(url); // try to find match for this request in the edge cache
	if(response){
		// use cache found on Cloudflare edge. Set X-Worker-Cache header for helpful debug
		let newHdrs = fixHeaders(url, response.status, response.headers);
		newHdrs.set('X-Worker-Cache', "true");
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHdrs
		});
	}
	response = await fetch(url, {cf: {polish: "lossless"}});
	let newHdrs = fixHeaders(url, response.status, response.headers);
	response = new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: newHdrs
	});

	event.waitUntil(cache.put(url, response.clone()));
	return response;
}addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  console.log('Got request', request)
  const response = await fetch(request)
  console.log('Got response', response)
  return response
}
;addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  console.log('Got request', request)
  const response = await fetch(request)
  console.log('Got response', response)
  return response
}addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  console.log('Got request', request)
  const response = await fetch(request)
  console.log('Got response', response)
  return response
}