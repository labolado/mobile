#import <React/RCTBridge.h>

@interface RNHotelsBridge : NSObject

+ (RNHotelsBridge *)sharedInstance;
- (RCTBridge *)bridgeForBundleURL:(NSURL*)jsCodeLocation;

@end
