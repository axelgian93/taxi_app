// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_diagnostics_matching_get200_response_env.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminDiagnosticsMatchingGet200ResponseEnv
    extends AdminDiagnosticsMatchingGet200ResponseEnv {
  @override
  final int? MATCH_RADIUS_M;
  @override
  final int? LOCATION_MAX_AGE_MIN;

  factory _$AdminDiagnosticsMatchingGet200ResponseEnv(
          [void Function(AdminDiagnosticsMatchingGet200ResponseEnvBuilder)?
              updates]) =>
      (AdminDiagnosticsMatchingGet200ResponseEnvBuilder()..update(updates))
          ._build();

  _$AdminDiagnosticsMatchingGet200ResponseEnv._(
      {this.MATCH_RADIUS_M, this.LOCATION_MAX_AGE_MIN})
      : super._();
  @override
  AdminDiagnosticsMatchingGet200ResponseEnv rebuild(
          void Function(AdminDiagnosticsMatchingGet200ResponseEnvBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminDiagnosticsMatchingGet200ResponseEnvBuilder toBuilder() =>
      AdminDiagnosticsMatchingGet200ResponseEnvBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminDiagnosticsMatchingGet200ResponseEnv &&
        MATCH_RADIUS_M == other.MATCH_RADIUS_M &&
        LOCATION_MAX_AGE_MIN == other.LOCATION_MAX_AGE_MIN;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, MATCH_RADIUS_M.hashCode);
    _$hash = $jc(_$hash, LOCATION_MAX_AGE_MIN.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'AdminDiagnosticsMatchingGet200ResponseEnv')
          ..add('MATCH_RADIUS_M', MATCH_RADIUS_M)
          ..add('LOCATION_MAX_AGE_MIN', LOCATION_MAX_AGE_MIN))
        .toString();
  }
}

class AdminDiagnosticsMatchingGet200ResponseEnvBuilder
    implements
        Builder<AdminDiagnosticsMatchingGet200ResponseEnv,
            AdminDiagnosticsMatchingGet200ResponseEnvBuilder> {
  _$AdminDiagnosticsMatchingGet200ResponseEnv? _$v;

  int? _MATCH_RADIUS_M;
  int? get MATCH_RADIUS_M => _$this._MATCH_RADIUS_M;
  set MATCH_RADIUS_M(int? MATCH_RADIUS_M) =>
      _$this._MATCH_RADIUS_M = MATCH_RADIUS_M;

  int? _LOCATION_MAX_AGE_MIN;
  int? get LOCATION_MAX_AGE_MIN => _$this._LOCATION_MAX_AGE_MIN;
  set LOCATION_MAX_AGE_MIN(int? LOCATION_MAX_AGE_MIN) =>
      _$this._LOCATION_MAX_AGE_MIN = LOCATION_MAX_AGE_MIN;

  AdminDiagnosticsMatchingGet200ResponseEnvBuilder() {
    AdminDiagnosticsMatchingGet200ResponseEnv._defaults(this);
  }

  AdminDiagnosticsMatchingGet200ResponseEnvBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _MATCH_RADIUS_M = $v.MATCH_RADIUS_M;
      _LOCATION_MAX_AGE_MIN = $v.LOCATION_MAX_AGE_MIN;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminDiagnosticsMatchingGet200ResponseEnv other) {
    _$v = other as _$AdminDiagnosticsMatchingGet200ResponseEnv;
  }

  @override
  void update(
      void Function(AdminDiagnosticsMatchingGet200ResponseEnvBuilder)?
          updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminDiagnosticsMatchingGet200ResponseEnv build() => _build();

  _$AdminDiagnosticsMatchingGet200ResponseEnv _build() {
    final _$result = _$v ??
        _$AdminDiagnosticsMatchingGet200ResponseEnv._(
          MATCH_RADIUS_M: MATCH_RADIUS_M,
          LOCATION_MAX_AGE_MIN: LOCATION_MAX_AGE_MIN,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
