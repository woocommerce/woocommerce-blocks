#!/usr/bin/env node
'use strict';

const { makeChangeLog: githubMake } = require( './github' );
const { makeChangeLog: zenhubMake } = require( './zenhub' );
const { pkg, changelogSrcTypes } = require( './config' );

const makeChangeLog =
	pkg.changelogSrcType === changelogSrcTypes.ZENHUB ? zenhubMake : githubMake;

makeChangeLog();
