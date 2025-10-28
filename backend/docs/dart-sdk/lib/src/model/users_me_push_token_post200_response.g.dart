// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'users_me_push_token_post200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UsersMePushTokenPost200Response
    extends UsersMePushTokenPost200Response {
  @override
  final bool? ok;

  factory _$UsersMePushTokenPost200Response(
          [void Function(UsersMePushTokenPost200ResponseBuilder)? updates]) =>
      (UsersMePushTokenPost200ResponseBuilder()..update(updates))._build();

  _$UsersMePushTokenPost200Response._({this.ok}) : super._();
  @override
  UsersMePushTokenPost200Response rebuild(
          void Function(UsersMePushTokenPost200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UsersMePushTokenPost200ResponseBuilder toBuilder() =>
      UsersMePushTokenPost200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UsersMePushTokenPost200Response && ok == other.ok;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ok.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'UsersMePushTokenPost200Response')
          ..add('ok', ok))
        .toString();
  }
}

class UsersMePushTokenPost200ResponseBuilder
    implements
        Builder<UsersMePushTokenPost200Response,
            UsersMePushTokenPost200ResponseBuilder> {
  _$UsersMePushTokenPost200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  UsersMePushTokenPost200ResponseBuilder() {
    UsersMePushTokenPost200Response._defaults(this);
  }

  UsersMePushTokenPost200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UsersMePushTokenPost200Response other) {
    _$v = other as _$UsersMePushTokenPost200Response;
  }

  @override
  void update(void Function(UsersMePushTokenPost200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UsersMePushTokenPost200Response build() => _build();

  _$UsersMePushTokenPost200Response _build() {
    final _$result = _$v ??
        _$UsersMePushTokenPost200Response._(
          ok: ok,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
