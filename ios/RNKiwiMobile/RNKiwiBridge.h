#import <Foundation/Foundation.h>

@interface RNKiwiBridge : NSObject

+ (RNKiwiBridge *)sharedInstance;
- (NSObject *)createBridge: (NSURL * )jsCodeLocation;

@end
