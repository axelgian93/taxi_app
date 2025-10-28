// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'users_register_push_token200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UsersRegisterPushToken200Response
    extends UsersRegisterPushToken200Response {
  @override
  final bool? ok;

  factory _$UsersRegisterPushToken200Response(
          [void Function(UsersRegisterPushToken200ResponseBuilder)? updates]) =>
      (UsersRegisterPushToken200ResponseBuilder()..update(updates))._build();

  _$UsersRegisterPushToken200Response._({this.ok}) : super._();
  @override
  UsersRegisterPushToken200Response rebuild(
          void Function(UsersRegisterPushToken200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UsersRegisterPushToken200ResponseBuilder toBuilder() =>
      UsersRegisterPushToken200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UsersRegisterPushToken200Response && ok == other.ok;
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
    return (newBuiltValueToStringHelper(r'UsersRegisterPushToken200Response')
          ..add('ok', ok))
        .toString();
  }
}

class UsersRegisterPushToken200ResponseBuilder
    implements
        Builder<UsersRegisterPushToken200Response,
            UsersRegisterPushToken200ResponseBuilder> {
  _$UsersRegisterPushToken200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  UsersRegisterPushToken200ResponseBuilder() {
    UsersRegisterPushToken200Response._defaults(this);
  }

  UsersRegisterPushToken200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UsersRegisterPushToken200Response other) {
    _$v = other as _$UsersRegisterPushToken200Response;
  }

  @override
  void update(
      void Function(UsersRegisterPushToken200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UsersRegisterPushToken200Response build() => _build();

  _$UsersRegisterPushToken200Response _build() {
    final _$result = _$v ??
        _$UsersRegisterPushToken200Response._(
          ok: ok,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
