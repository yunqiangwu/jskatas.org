import {h} from 'preact';
import {render as preactRender} from 'preact-render-to-string';
import {loadViaNode} from './http-get.js';
import Page from '../components/page.js';
import RawMetadata from '../rawmetadata.js';
import {metadataUrls} from '../config.js';

const _renderOnServer = (err, kataBundles) => {
  if (err) {
    throw new Error(err);
  } else {
    return preactRender(<Page kataBundles={kataBundles}/>);
  }
};

export const render = async () => {
  const bundlesMetadata = await Promise.all([
    loadViaNode(metadataUrls.es1),
    loadViaNode(metadataUrls.es6),
    loadViaNode(metadataUrls.es8),
    loadViaNode(metadataUrls.hamjest),
  ]);
  
  const kataBundles = [];
  kataBundles.push({name: 'ECMAScript 1', kataBundle: RawMetadata.toKataBundle(bundlesMetadata[0])});
  kataBundles.push({name: 'ECMAScript 6', kataBundle: RawMetadata.toKataBundle(bundlesMetadata[1])});
  kataBundles.push({name: 'ECMAScript 8', kataBundle: RawMetadata.toKataBundle(bundlesMetadata[2])});
  kataBundles.push({name: 'Assertion Library Hamjest', kataBundle: RawMetadata.toKataBundle(bundlesMetadata[3])});

  return _renderOnServer(null, kataBundles);
};