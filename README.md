# Trendyol Nodejs Utilities

This package meant to be used for simple and useful, utilty purposed components.

# Installation

`yarn add ty-utility`

# Types

    nrSegment(segmentName: string, record: boolean = true);
    nrSegmentAsync(segmentName: string, record: boolean = true);
    safeRoute();

# How to use

  ## nrSegment and nrSegmentAsync
  
  In your class methods, call the decorator with segment name and record(optional) parameters. And it will create a segment in your new relic application. For async methods use <code>nrSegmentAsync</code>

    @nrSegment('SegmentName')
    function someFunction(){ ... }

  ## safeRoute

  Helps to add a try catch block for your defined route middleware function. It will wrap the function with a try catch block and calls express <code>next</code> function to trigger global error handler.

    @safeRoute
    function someMiddleWare(req, res, next){ ... }

  ## priorityGroupMapper

  Groups object by given `groupKey` when selects the biggest `sortKey`.

    stamps = this.priorityGroupMapper(stamps, 'priority', 'position', {
      aspectRatio: (v: number) => v && v > 0 && v <= STAMPS_MAX_ASPECT_RATIO ? v : STAMPS_DEFAULT_ASPECT_RATIO,
    });
