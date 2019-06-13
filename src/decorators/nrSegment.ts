import { startSegment } from "newrelic";

export const nrSegment = (segmentName: string, record: boolean = true) => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    if (process.env.NR_SEGMENTS_ENABLED !== "true") {
      return descriptor;
    }

    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      return startSegment(segmentName, record, () => {
        return original.apply(this, args);
      });
    };

    return descriptor;
  };
};

export const nrSegmentAsync = (segmentName: string, record: boolean = true) => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    if (process.env.NR_SEGMENTS_ENABLED !== "true") {
      return descriptor;
    }
    const original = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      return await startSegment(segmentName, record, async () => {
        return await original.apply(this, args);
      });
    };

    return descriptor;
  };
};
