// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'users_me_push_token_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UsersMePushTokenPostRequest extends UsersMePushTokenPostRequest {
  @override
  final String fcmToken;

  factory _$UsersMePushTokenPostRequest(
          [void Function(UsersMePushTokenPostRequestBuilder)? updates]) =>
      (UsersMePushTokenPostRequestBuilder()..update(updates))._build();

  _$UsersMePushTokenPostRequest._({required this.fcmToken}) : super._();
  @override
  UsersMePushTokenPostRequest rebuild(
          void Function(UsersMePushTokenPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UsersMePushTokenPostRequestBuilder toBuilder() =>
      UsersMePushTokenPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UsersMePushTokenPostRequest && fcmToken == other.fcmToken;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, fcmToken.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'UsersMePushTokenPostRequest')
          ..add('fcmToken', fcmToken))
        .toString();
  }
}

class UsersMePushTokenPostRequestBuilder
    implements
        Builder<UsersMePushTokenPostRequest,
            UsersMePushTokenPostRequestBuilder> {
  _$UsersMePushTokenPostRequest? _$v;

  String? _fcmToken;
  String? get fcmToken => _$this._fcmToken;
  set fcmToken(String? fcmToken) => _$this._fcmToken = fcmToken;

  UsersMePushTokenPostRequestBuilder() {
    UsersMePushTokenPostRequest._defaults(this);
  }

  UsersMePushTokenPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _fcmToken = $v.fcmToken;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UsersMePushTokenPostRequest other) {
    _$v = other as _$UsersMePushTokenPostRequest;
  }

  @override
  void update(void Function(UsersMePushTokenPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UsersMePushTokenPostRequest build() => _build();

  _$UsersMePushTokenPostRequest _build() {
    final _$result = _$v ??
        _$UsersMePushTokenPostRequest._(
          fcmToken: BuiltValueNullFieldError.checkNotNull(
              fcmToken, r'UsersMePushTokenPostRequest', 'fcmToken'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
