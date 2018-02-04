//
//  AgoraRTCModule.m
//  AgoraReact
//
//  Created by GongYuhua on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AgoraRTCEngineModule.h"
#import <AgoraRTCEngineKit/AgoraRtcEngineKit.h>
#import <React/RCTUIManager.h>
#import "AgoraRendererViewManager.h"
#import <React/RCTUIManagerUtils.h>

@interface AgoraRTCEngineModule () <AgoraRtcEngineDelegate>
@property (strong, nonatomic) AgoraRtcEngineKit *kit;
@end

@implementation RCTConvert (ChannelProfile)
RCT_ENUM_CONVERTER(AgoraChannelProfile, (@{ @"channelProfileCommunication" : @(AgoraChannelProfileCommunication),
                                            @"channelProfileLiveBroadcasting" : @(AgoraChannelProfileLiveBroadcasting)}),
                   AgoraChannelProfileCommunication, integerValue)

- (NSDictionary *)constantsToExport
{
  return @{ @"statusBarAnimationNone" : @(UIStatusBarAnimationNone),
            @"statusBarAnimationFade" : @(UIStatusBarAnimationFade),
            @"statusBarAnimationSlide" : @(UIStatusBarAnimationSlide) };
}
@end

@implementation AgoraRTCEngineModule
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"RemoteDidJoineChannel"];
}

RCT_EXPORT_METHOD(createEngine:(NSString *)appId)
{
  self.kit = [AgoraRtcEngineKit sharedEngineWithAppId:appId delegate:self];
}

RCT_EXPORT_METHOD(enableVideo)
{
  [self.kit enableVideo];
}

RCT_EXPORT_METHOD(enableAudio)
{
  [self.kit enableAudio];
}

RCT_EXPORT_METHOD(setVideoProfile:(NSInteger)width height:(NSInteger)height frameRate:(NSInteger)frameRate bitrate:(NSInteger)bitrate)
{
  [self.kit setVideoResolution:CGSizeMake(width, height) andFrameRate:frameRate bitrate:bitrate];
}

RCT_EXPORT_METHOD(setChannelProfile:(AgoraChannelProfile)profile)
{
  [self.kit setChannelProfile:profile];
}

RCT_EXPORT_METHOD(setLocalView:(nonnull NSNumber *)reactTag)
{
  AgoraRendererViewManager *manager = [AgoraRendererViewManager currentManager];
  dispatch_async(RCTGetUIManagerQueue(), ^{
    [manager.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      UIView *view = viewRegistry[reactTag];
      AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
      canvas.uid = 0;
      canvas.view = view;
      canvas.renderMode = AgoraVideoRenderModeHidden;
      [self.kit setupLocalVideo:canvas];
    }];
  });
}

RCT_EXPORT_METHOD(startPreview)
{
  [self.kit startPreview];
}

RCT_EXPORT_METHOD(stopPreview)
{
  [self.kit stopPreview];
}

RCT_EXPORT_METHOD(setRemoteView:(nonnull NSNumber *)reactTag remoteId:(nonnull NSNumber *)remoteId)
{
  AgoraRendererViewManager *manager = [AgoraRendererViewManager currentManager];
  dispatch_async(RCTGetUIManagerQueue(), ^{
    [manager.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      UIView *view = viewRegistry[reactTag];
      AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
      canvas.uid = remoteId.unsignedIntegerValue;
      canvas.view = view;
      canvas.renderMode = AgoraVideoRenderModeHidden;
      [self.kit setupRemoteVideo:canvas];
    }];
  });
}

RCT_EXPORT_METHOD(joinChannel:(NSString *)channel uid:(NSInteger)uid)
{
  [self.kit joinChannelByToken:nil channelId:channel info:nil uid:uid joinSuccess:nil];
}

RCT_EXPORT_METHOD(leaveChannel)
{
  [self.kit leaveChannel:nil];
}

- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinChannel:(NSString *)channel withUid:(NSUInteger)uid elapsed:(NSInteger)elapsed
{
  NSLog(@"==== didJoinChannel: %lu", (unsigned long)uid);
}

- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed
{
  [self sendEventWithName:@"RemoteDidJoineChannel" body:@{@"uid": @(uid)}];
}
@end
