// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'users_register_push_token_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UsersRegisterPushTokenRequest extends UsersRegisterPushTokenRequest {
  @override
  final String fcmToken;

  factory _$UsersRegisterPushTokenRequest(
          [void Function(UsersRegisterPushTokenRequestBuilder)? updates]) =>
      (UsersRegisterPushTokenRequestBuilder()..update(updates))._build();

  _$UsersRegisterPushTokenRequest._({required this.fcmToken}) : super._();
  @override
  UsersRegisterPushTokenRequest rebuild(
          void Function(UsersRegisterPushTokenRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UsersRegisterPushTokenRequestBuilder toBuilder() =>
      UsersRegisterPushTokenRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UsersRegisterPushTokenRequest && fcmToken == other.fcmToken;
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
    return (newBuiltValueToStringHelper(r'UsersRegisterPushTokenRequest')
          ..add('fcmToken', fcmToken))
        .toString();
  }
}

class UsersRegisterPushTokenRequestBuilder
    implements
        Builder<UsersRegisterPushTokenRequest,
            UsersRegisterPushTokenRequestBuilder> {
  _$UsersRegisterPushTokenRequest? _$v;

  String? _fcmToken;
  String? get fcmToken => _$this._fcmToken;
  set fcmToken(String? fcmToken) => _$this._fcmToken = fcmToken;

  UsersRegisterPushTokenRequestBuilder() {
    UsersRegisterPushTokenRequest._defaults(this);
  }

  UsersRegisterPushTokenRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _fcmToken = $v.fcmToken;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UsersRegisterPushTokenRequest other) {
    _$v = other as _$UsersRegisterPushTokenRequest;
  }

  @override
  void update(void Function(UsersRegisterPushTokenRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UsersRegisterPushTokenRequest build() => _build();

  _$UsersRegisterPushTokenRequest _build() {
    final _$result = _$v ??
        _$UsersRegisterPushTokenRequest._(
          fcmToken: BuiltValueNullFieldError.checkNotNull(
              fcmToken, r'UsersRegisterPushTokenRequest', 'fcmToken'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
