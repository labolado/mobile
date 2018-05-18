#import "RNKiwiBridge.h"
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>

@interface RNKiwiBridge()

@property (nonatomic, strong) RCTBridge *bridge;

@end

@implementation RNKiwiBridge

+ (id)sharedInstance {
  static dispatch_once_t pred = 0;
  __strong static id _sharedObject = nil;
  dispatch_once(&pred, ^{
    _sharedObject = [[self alloc] init];
  });
  return _sharedObject;
}

- (RCTBridge *)createBridge:(NSURL *)jsCodeLocation {
  if (!_bridge) {
    _bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:nil launchOptions:nil];
  }
  return _bridge;
}

@end
